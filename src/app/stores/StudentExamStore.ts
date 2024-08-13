import { makeAutoObservable, runInAction } from "mobx";
import {
  Exam,
  ExamSolution,
  ExamSolutionFormValues,
  PublishExam,
  UpdateExam,
} from "../models/StudentExam";
import axiosAgent from "../api/axiosAgent";

/**
 * Represents a store for managing student exams.
 */
export class StudentExamStore {
  // Represents the studentExams property.
  studentExams = new Map<string, Exam>();

  // Represents the examDetails property.
  examDetails: Exam | null = null;

  // Represents the examCards property.
  examCards: ExamSolution[] = [];

  // Represents the examCard property.
  examCard: ExamSolution | null = null;

  // Represents the examSolutionByStudent property.
  examSolutionByStudent: ExamSolution | null = null;

  // Represents the isEligibleToSubmitExam property.
  isEligibleToSubmitExam = false;

  // Represents the upcomingExams property.
  upcomingExams: Exam[] = [];

  // Represents the loading state of various operations.
  loading = {
    studentExams: false,
    examDetails: false,
    examCards: false,
    examCard: false,
    examSolutionByStudent: false,
    publishExam: false,
    submitExamSolution: false,
    deleteExam: false,
    updateExam: false,
    commentPracticePatientExaminationCard: false,
    commentAPIForm: false,
    commentBleedingForm: false,
    commentBeweForm: false,
    commentDMFT_DMFSForm: false,
    markExamAsGraded: false,
    gradeExaminationCard: false,
    isEligibleToSubmitExam: false,
    upcomingExams: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Sets the upcomingExams property.
  setUpcmoingExams = (exams: Exam[]) => {
    this.upcomingExams = exams;
  };

  // Sets the studentExams property.
  setStudentExams = (studentExam: Exam) => {
    studentExam.dateOfExamination = new Date(studentExam.dateOfExamination);
    this.studentExams.set(studentExam.id, studentExam);
  };

  // Sets the examDetails property.
  setExamDetails = (examDetails: Exam) => {
    this.examDetails = examDetails;
  };

  // Sets the examCards property.
  setExamCards = (examCards: ExamSolution[]) => {
    this.examCards = examCards;
  };

  // Sets the examCard property.
  setExamCard = (examCard: ExamSolution) => {
    this.examCard = examCard;
  };

  // Sets the examSolutionByStudent property.
  setExamSolutionByStudent = (examSolutionByStudent: ExamSolution) => {
    this.examSolutionByStudent = examSolutionByStudent;
  };

  // Gets the examDetails property by the provided examId.
  getExamDetails = (examId: string) => {
    return this.studentExams.get(examId);
  };

  // Gets the examCard property by the provided cardId.
  getExamCard = (cardId: string) => {
    return this.examCards.find((card) => card.id === cardId);
  };

  // Clears the examDetails property.
  clearExamDetails = () => {
    this.examDetails = null;
  };

  // Clears the examSolutionByStudent property.
  clearExamSolutionByStudent = () => {
    this.examSolutionByStudent = null;
  };

  // Sets the eligibility for students to submit exams.
  setEligibilityToSubmitExam = (isEligible: boolean) => {
    this.isEligibleToSubmitExam = isEligible;
  };

  /**
   * Returns an array of grouped student exams.
   * The exams are grouped by year and month of examination date.
   * Each group is represented as an entry in the returned array.
   * The key of each entry is a string in the format "YYYY-MM" representing the year and month.
   * The value of each entry is an array of exams that belong to that group.
   *
   * @returns {Array<[string, Exam[]]>} An array of grouped student exams.
   */
  get groupedStudentExams() {
    return Object.entries(
      this.studentExamsByDate.reduce((studentExams, exam) => {
        const year = exam.dateOfExamination.getFullYear();
        const month = (exam.dateOfExamination.getMonth() + 1)
          .toString()
          .padStart(2, "0");

        const yearMonth = `${year}-${month}`;

        studentExams[yearMonth] = studentExams[yearMonth]
          ? [...studentExams[yearMonth], exam]
          : [exam];

        return studentExams;
      }, {} as { [key: string]: Exam[] })
    );
  }

  /**
   * Returns an array of student exams sorted by date of examination.
   *
   * @returns {StudentExam[]} The sorted array of student exams.
   */
  get studentExamsByDate() {
    return Array.from(this.studentExams.values()).sort(
      (a, b) => a.dateOfExamination.getTime() - b.dateOfExamination.getTime()
    );
  }

  /**
   * Publishes an exam.
   *
   * @param values - The values needed to publish the exam.
   * @returns A Promise that resolves to the published exam.
   * @throws If an error occurs while publishing the exam.
   */
  publishExam = async (values: PublishExam) => {
    this.loading.publishExam = true;
    try {
      const exam = await axiosAgent.StudentExamOperations.publishExam(values);
      runInAction(() => {
        if (exam) {
          this.setStudentExams(exam);
        }
        this.loading.publishExam = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.publishExam = false;
      throw error;
    }
  };

  /**
   * Deletes an exam.
   * 
   * @param examId - The ID of the exam to be deleted.
   * @returns A promise that resolves when the exam is successfully deleted.
   * @throws An error if the deletion fails.
   */
  deleteExam = async (examId: string) => {
    this.loading.deleteExam = true;
    try {
      await axiosAgent.StudentExamOperations.deleteExam(examId);
      runInAction(() => {
        this.studentExams.delete(examId);
        this.loading.deleteExam = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.deleteExam = false;
    }
  };

  /**
   * Updates an exam with the given examId and values.
   * 
   * @param {string} examId - The ID of the exam to update.
   * @param {UpdateExam} values - The updated values for the exam.
   * @returns {Promise<void>} - A promise that resolves when the exam is updated.
   * @throws {Error} - If an error occurs while updating the exam.
   */
  updateExam = async (examId: string, values: UpdateExam) => {
    this.loading.updateExam = true;
    try {
      const updatedExam = await axiosAgent.StudentExamOperations.updateExam(
        examId,
        values
      );
      runInAction(() => {
        if (updatedExam) {
          this.setStudentExams(updatedExam);
        }
        this.loading.updateExam = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.updateExam = false;
    }
  };

  /**
   * Comments on a practice patient examination card.
   * 
   * @param cardId - The ID of the card to comment on.
   * @param comment - The comment to add to the card.
   * @returns A promise that resolves when the comment is successfully added.
   * @throws An error if there was a problem adding the comment.
   */
  commentPracticePatientExaminationCard = async (
    cardId: string,
    comment: string
  ) => {
    this.loading.commentPracticePatientExaminationCard = true;
    try {
      await axiosAgent.StudentExamOperations.commentPracticePatientExaminationCard(
        cardId,
        comment
      );
      runInAction(() => {
        if (this.examCard) {
          this.examCard.doctorComment = comment;
        }
        this.loading.commentPracticePatientExaminationCard = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.commentPracticePatientExaminationCard = false;
    }
  };

  /**
   * Sends a comment to the API for a specific card.
   * 
   * @param {string} cardId - The ID of the card.
   * @param {string} comment - The comment to be sent.
   * @returns {Promise<void>} - A promise that resolves when the comment is successfully sent.
   * @throws {Error} - If an error occurs while sending the comment.
   */
  commentAPIForm = async (cardId: string, comment: string) => {
    this.loading.commentAPIForm = true;
    try {
      await axiosAgent.StudentExamOperations.commentAPIForm(cardId, comment);
      runInAction(() => {
        if (this.examCard) {
          this.examCard.practicePatientExaminationResult.api.comment = comment;
        }
        this.loading.commentAPIForm = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.commentAPIForm = false;
    }
  };

  /**
   * Adds a comment to the bleeding form of a student exam card.
   * 
   * @param cardId - The ID of the exam card.
   * @param comment - The comment to be added.
   * @returns A promise that resolves when the comment is successfully added.
   * @throws An error if there is an issue adding the comment.
   */
  commentBleedingForm = async (cardId: string, comment: string) => {
    this.loading.commentBleedingForm = true;
    try {
      await axiosAgent.StudentExamOperations.commentBleedingForm(
        cardId,
        comment
      );
      runInAction(() => {
        if (this.examCard) {
          this.examCard.practicePatientExaminationResult.bleeding.comment =
            comment;
        }
        this.loading.commentBleedingForm = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.commentBleedingForm = false;
    }
  };

  /**
   * Adds a comment to the bewe form of a student exam card.
   * 
   * @param cardId - The ID of the exam card.
   * @param comment - The comment to be added.
   * @returns A promise that resolves when the comment is successfully added.
   * @throws An error if there is a problem adding the comment.
   */
  commentBeweForm = async (cardId: string, comment: string) => {
    this.loading.commentBeweForm = true;
    try {
      await axiosAgent.StudentExamOperations.commentBeweForm(cardId, comment);
      runInAction(() => {
        if (this.examCard) {
          this.examCard.practicePatientExaminationResult.bewe.comment = comment;
        }
        this.loading.commentBeweForm = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.commentBeweForm = false;
    }
  };

  /**
   * Adds a comment to the DMFT_DMFS form for a specific card.
   * 
   * @param cardId - The ID of the card.
   * @param comment - The comment to be added.
   * @returns A promise that resolves when the comment is successfully added.
   * @throws An error if there is an issue adding the comment.
   */
  commentDMFT_DMFSForm = async (cardId: string, comment: string) => {
    this.loading.commentDMFT_DMFSForm = true;
    try {
      await axiosAgent.StudentExamOperations.commentDMFT_DMFSForm(
        cardId,
        comment
      );
      runInAction(() => {
        if (this.examCard) {
          this.examCard.practicePatientExaminationResult.dmfT_DMFS.comment =
            comment;
        }
        this.loading.commentDMFT_DMFSForm = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.commentDMFT_DMFSForm = false;
    }
  };

  /**
   * Marks an exam as graded.
   * 
   * @param examId - The ID of the exam to be marked as graded.
   * @returns A Promise that resolves when the exam is successfully marked as graded.
   * @throws An error if there is a problem marking the exam as graded.
   */
  markExamAsGraded = async (examId: string) => {
    this.loading.markExamAsGraded = true;
    try {
      await axiosAgent.StudentExamOperations.markExamAsGraded(examId);
      runInAction(() => {
        this.studentExams = new Map(
          Array.from(this.studentExams).map(([key, exam]) => {
            if (exam.id === examId) {
              return [key, { ...exam, examStatus: "Graded" }];
            }
            return [key, exam];
          })
        );
        if (this.examDetails?.id === examId) {
          this.examDetails.examStatus = "Graded";
        }
        this.loading.markExamAsGraded = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.markExamAsGraded = false;
    }
  };

  /**
   * Grades an examination card for a student.
   * 
   * @param {string} cardId - The ID of the examination card.
   * @param {number} studentMark - The mark obtained by the student.
   * @returns {Promise<void>} - A promise that resolves when the examination card is graded.
   * @throws {Error} - If an error occurs while grading the examination card.
   */
  gradeExaminationCard = async (cardId: string, studentMark: number) => {
    this.loading.gradeExaminationCard = true;
    try {
      await axiosAgent.StudentExamOperations.gradeExaminationCard(
        cardId,
        studentMark
      );
      runInAction(() => {
        if (this.examCard) {
          this.examCard.studentMark = studentMark;
        }
        this.loading.gradeExaminationCard = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.gradeExaminationCard = false;
    }
  };

  /**
   * Fetches student exams for a given group ID.
   * 
   * @param groupId - The ID of the group.
   * @returns A Promise that resolves to the fetched exams.
   * @throws If an error occurs during the fetch process.
   */
  fetchStudentExams = async (grouId: string) => {
    this.loading.studentExams = true;
    try {
      const exams = await axiosAgent.StudentExamOperations.getExams(grouId);
      runInAction(() => {
        exams.forEach((exam) => {
          this.setStudentExams(exam);
        });
        this.loading.studentExams = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.studentExams = false;
    }
  };

  /**
   * Fetches the details of an exam.
   * 
   * @param examId - The ID of the exam to fetch details for.
   */
  fetchExamDetails = async (examId: string) => {
    this.loading.examDetails = true;
    const examDetails = this.getExamDetails(examId);
    if (examDetails) {
      runInAction(() => {
        this.setExamDetails(examDetails);
        this.loading.examDetails = false;
      });
      return;
    }
    try {
      const exam = await axiosAgent.StudentExamOperations.getExamDetails(
        examId
      );
      runInAction(() => {
        this.setExamDetails(exam);
        this.loading.examDetails = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.examDetails = false;
    }
  };

  /**
   * Fetches exam cards for a given exam ID.
   * 
   * @param examId - The ID of the exam.
   * @returns A promise that resolves to the fetched exam cards.
   * @throws If an error occurs during the fetch operation.
   */
  fetchExamCards = async (examId: string) => {
    this.loading.examCards = true;
    try {
      const examCards = await axiosAgent.StudentExamOperations.getExamCards(
        examId
      );
      runInAction(() => {
        this.setExamCards(examCards);
        this.loading.examCards = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.examCards = false;
    }
  };

  /**
   * Fetches an exam card by its ID.
   * 
   * @param cardId - The ID of the exam card to fetch.
   * @returns A Promise that resolves to the fetched exam card.
   * @throws If an error occurs during the fetch operation.
   */
  fetchExamCard = async (cardId: string) => {
    this.loading.examCard = true;
    const examCard = this.getExamCard(cardId);
    if (examCard) {
      runInAction(() => {
        this.setExamCard(examCard);
        this.loading.examCard = false;
      });
      return;
    }
    try {
      const card = await axiosAgent.StudentExamOperations.getExamCard(cardId);
      runInAction(() => {
        this.setExamCard(card);
        this.loading.examCard = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.examCard = false;
    }
  };

  /**
   * Fetches the exam solution for a specific student.
   * 
   * @param examId - The ID of the exam.
   * @returns A promise that resolves to the exam solution.
   * @throws If an error occurs while fetching the exam solution.
   */
  fetchExamSolutionByStudent = async (examId: string) => {
    this.loading.examSolutionByStudent = true;
    try {
      const examSolution =
        await axiosAgent.StudentExamOperations.getExamSolution(examId);
      runInAction(() => {
        this.setExamSolutionByStudent(examSolution);
        this.loading.examSolutionByStudent = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.examSolutionByStudent = false;
    }
  };

  /**
   * Submits the exam solution for a given exam.
   * 
   * @param examId - The ID of the exam.
   * @param values - The values of the exam solution.
   * @returns A boolean indicating whether the exam solution was successfully submitted.
   */
  submitExamSolution = async (
    examId: string,
    values: ExamSolutionFormValues
  ) => {
    this.loading.submitExamSolution = true;
    try {
      await axiosAgent.StudentExamOperations.submitExamSolution(examId, values);
      runInAction(() => {
        this.loading.submitExamSolution = false;
      });
      return true;
    } catch (error) {
      console.error(error);
      this.loading.submitExamSolution = false;
    }
  };

  /**
   * Checks the eligibility of a student to submit an exam.
   * 
   * @param examId - The ID of the exam to check eligibility for.
   * @returns A promise that resolves to a boolean indicating whether the student is eligible to submit the exam.
   * @throws If an error occurs while checking the eligibility.
   */
  checkEligibilityToSubmitExam = async (examId: string) => {
    this.loading.isEligibleToSubmitExam = true;
    try {
      const isEligible =
        await axiosAgent.StudentExamOperations.checkExamEligibility(examId);
      runInAction(() => {
        this.setEligibilityToSubmitExam(isEligible);
        this.loading.isEligibleToSubmitExam = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.isEligibleToSubmitExam = false;
    }
  };

  /**
   * Retrieves the upcoming exams for the student.
   * @returns {Promise<void>} A promise that resolves when the upcoming exams are retrieved.
   */
  getUpcomingExams = async () => {
    this.loading.upcomingExams = true;
    try {
      const exams = await axiosAgent.StudentExamOperations.getUpcomingExams();
      runInAction(() => {
        this.setUpcmoingExams(exams);
        this.loading.upcomingExams = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.upcomingExams = false;
    }
  };
}
