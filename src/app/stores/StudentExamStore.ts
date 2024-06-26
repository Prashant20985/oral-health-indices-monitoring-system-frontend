import { makeAutoObservable, runInAction } from "mobx";
import {
  Exam,
  ExamSolution,
  ExamSolutionFormValues,
  PublishExam,
  UpdateExam,
} from "../models/StudentExam";
import axiosAgent from "../api/axiosAgent";

export class StudentExamStore {
  studentExams = new Map<string, Exam>();
  examDetails: Exam | null = null;
  examCards: ExamSolution[] = [];
  examCard: ExamSolution | null = null;
  examSolutionByStudent: ExamSolution | null = null;

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
  };

  constructor() {
    makeAutoObservable(this);
  }

  setStudentExams = (studentExam: Exam) => {
    studentExam.dateOfExamination = new Date(studentExam.dateOfExamination);
    this.studentExams.set(studentExam.id, studentExam);
  };

  setExamDetails = (examDetails: Exam) => {
    this.examDetails = examDetails;
  };

  setExamCards = (examCards: ExamSolution[]) => {
    this.examCards = examCards;
  };

  setExamCard = (examCard: ExamSolution) => {
    this.examCard = examCard;
  };

  setExamSolutionByStudent = (examSolutionByStudent: ExamSolution) => {
    this.examSolutionByStudent = examSolutionByStudent;
  };

  getExamDetails = (examId: string) => {
    return this.studentExams.get(examId);
  };

  getExamCard = (cardId: string) => {
    return this.examCards.find((card) => card.id === cardId);
  };

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

  get studentExamsByDate() {
    return Array.from(this.studentExams.values()).sort(
      (a, b) => a.dateOfExamination.getTime() - b.dateOfExamination.getTime()
    );
  }

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

  commentBleedingForm = async (cardId: string, comment: string) => {
    this.loading.commentBleedingForm = true;
    try {
      await axiosAgent.StudentExamOperations.commentBleedingForm(cardId, comment);
      runInAction(() => {
        if (this.examCard) {
          this.examCard.practicePatientExaminationResult.bleeding.comment = comment;
        }
        this.loading.commentBleedingForm = false;
      });
    } catch (error) {
      console.error(error);
      this.loading.commentBleedingForm = false;
    }
  };

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
}
