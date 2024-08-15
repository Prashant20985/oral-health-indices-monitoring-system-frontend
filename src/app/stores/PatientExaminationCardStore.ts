import { makeAutoObservable, reaction, runInAction } from "mobx";
import {
  PatientExaminationCard,
  PatientExaminationCardByDoctorFormValues,
  PatientExaminationCardByStudentFormValues,
} from "../models/PatientExaminationCard";
import axiosAgent from "../api/axiosAgent";
import { store } from "./Store";
import { APIBleedingAssessmentModel } from "../models/APIBleeding";
import { BeweAssessmentModel } from "../models/Bewe";
import { UpdateDMFT_DMFSFormValues } from "../models/DMFT_DMFS";
import { RiskFactorAssessmentModel } from "../models/RiskFactorAssesment";
import { Summary } from "../models/Summary";

/**
 * Represents a store for managing patient examination cards.
 */
export class PatientExaminationCardStore {
  // Represents the patientExaminationCards property.
  patientExaminationCards = new Map<string, PatientExaminationCard>();

  // Represents the patientExaminationCardDetails property.
  patientExaminationCardDetails: PatientExaminationCard | null = null;

  // Represents the patientExaminationCardsAssignedToDoctor property.
  patientExaminationCardsAssignedToDoctor = new Map<
    string,
    PatientExaminationCard
  >();

  // Represents the Year property.
  year: number = new Date().getFullYear();

  // Represents the Month property.
  month: number = new Date().getMonth() + 1;

  // Represents the studentId property.
  studentId: string = "";

  // Represents the loading states for various operations.
  loading = {
    commentPatientExaminationCard: false,
    commentAPIForm: false,
    commentBleedingForm: false,
    commentBeweForm: false,
    commentDMFT_DMFSForm: false,
    updateAPIForm: false,
    updateBleedingForm: false,
    updateBeweForm: false,
    updateDMFT_DMFSForm: false,
    updateRiskAssessment: false,
    createPatientExaminationCardByDoctor: false,
    createPatientExaminationCardByStudent: false,
    deletePatientExaminationCard: false,
    gradePatientExaminationCard: false,
    getPatientExaminationCards: false,
    getPatientExaminationCardsAssignedToDoctor: false,
    updatePatientExaminationCardSummary: false,
    getPatientExaminationCardDetails: false,
  };

  constructor() {
    makeAutoObservable(this);

    // Reaction to the year, month, and studentId properties.
    reaction(
      () => ({
        year: this.year,
        month: this.month,
        studentId: this.studentId,
      }),
      () => {
        this.getPatientExaminationCardsAssignedToDoctor();
      }
    );
  }

  // Sets the patientExaminationCardDetails property.
  setPatientExaminationCardDetails(
    patientExaminationCard: PatientExaminationCard
  ) {
    this.patientExaminationCardDetails = patientExaminationCard;
  }

  // Sets the patientExaminationCards property.
  setPatientExaminationCards(
    patientExaminationCards: PatientExaminationCard[]
  ) {
    patientExaminationCards.forEach((patientExaminationCard) => {
      this.patientExaminationCards.set(
        patientExaminationCard.id,
        patientExaminationCard
      );
    });
  }

  // Clears the patientExaminationCardDetails property.
  clearPatientExamiantionCards = () => {
    this.patientExaminationCards.clear();
  };

  // Sets the patientExaminationCardsAssignedToDoctor property.
  setPatientExaminationCardsAssignedToDoctor(
    patientExaminationCards: PatientExaminationCard[]
  ) {
    patientExaminationCards.forEach((patientExaminationCard) => {
      this.patientExaminationCardsAssignedToDoctor.set(
        patientExaminationCard.id,
        patientExaminationCard
      );
    });
  }

  // Sets the year property.
  setYear = (year: number) => {
    this.year = year;
  };

  // Sets the month property.
  setMonth = (month: number) => {
    this.month = month;
  };

  // Sets the studentId property.
  setStudentId = (studentId: string) => {
    this.studentId = studentId;
  };

  // Gets patient examination card by id.
  getExaminationCardById(id: string) {
    return Array.from(this.patientExaminationCards.values())
      .concat(Array.from(this.patientExaminationCardsAssignedToDoctor.values()))
      .find((card) => card.id === id);
  }

  // Gets patient examination card assigned to doctor by id.
  getExaminationCardAssignedToDoctorById(id: string) {
    return this.patientExaminationCardsAssignedToDoctor.get(id);
  }

  /**
   * Returns an array of grouped patient examination cards.
   * The patient examination cards are grouped by year and month of examination date.
   * Each group is represented by a key in the format "YYYY-MM".
   * The value of each key is an array of patient examination cards belonging to that group.
   *
   * @returns {Array<[string, PatientExaminationCard[]]>} - An array of grouped patient examination cards.
   */
  get groupedPatientExaminationCards() {
    return Object.entries(
      this.patientExaminationCardsByDate.reduce(
        (patientExaminationCards, patientExaminationCard) => {
          const year = new Date(
            patientExaminationCard.dateOfExamination
          ).getFullYear();
          const month = (
            new Date(patientExaminationCard.dateOfExamination).getMonth() + 1
          )
            .toString()
            .padStart(2, "0");
          const key = `${year}-${month}`;
          patientExaminationCards[key] = patientExaminationCards[key]
            ? [...patientExaminationCards[key], patientExaminationCard]
            : [patientExaminationCard];

          return patientExaminationCards;
        },
        {} as { [key: string]: PatientExaminationCard[] }
      )
    );
  }

  /**
   * Returns an array of grouped patient examination cards assigned to a doctor.
   * The patient examination cards are grouped by year and month of examination date.
   * Each group is represented by a key in the format "YYYY-MM".
   * @returns An array of grouped patient examination cards.
   */
  get groupedPatientExaminationCardsAssignedToDoctor() {
    return Object.entries(
      this.patientExaminationCardsAssignedToDoctorByDate.reduce(
        (patientExaminationCards, patientExaminationCard) => {
          const year = new Date(
            patientExaminationCard.dateOfExamination
          ).getFullYear();
          const month = (
            new Date(patientExaminationCard.dateOfExamination).getMonth() + 1
          )
            .toString()
            .padStart(2, "0");
          const key = `${year}-${month}`;
          patientExaminationCards[key] = patientExaminationCards[key]
            ? [...patientExaminationCards[key], patientExaminationCard]
            : [patientExaminationCard];

          return patientExaminationCards;
        },
        {} as { [key: string]: PatientExaminationCard[] }
      )
    );
  }

  /**
   * Retrieves the top 4 patient examination cards assigned to the doctor.
   *
   * @returns An array containing the top 4 patient examination cards assigned to the doctor.
   */
  get getTop4PatientExaminationCardsAssignedToDoctor() {
    return this.groupedPatientExaminationCardsAssignedToDoctor.slice(0, 4);
  }

  /**
   * Returns an array of patient examination cards sorted by date of examination in descending order.
   *
   * @returns {PatientExaminationCard[]} The sorted array of patient examination cards.
   */
  get patientExaminationCardsByDate() {
    return Array.from(this.patientExaminationCards.values()).sort(
      (a, b) =>
        new Date(b.dateOfExamination).getTime() -
        new Date(a.dateOfExamination).getTime()
    );
  }

  /**
   * Retrieves an array of patient examination cards assigned to the doctor, sorted by date of examination in descending order.
   *
   * @returns {PatientExaminationCard[]} An array of patient examination cards assigned to the doctor, sorted by date of examination.
   */
  get patientExaminationCardsAssignedToDoctorByDate() {
    return Array.from(
      this.patientExaminationCardsAssignedToDoctor.values()
    ).sort(
      (a, b) =>
        new Date(b.dateOfExamination).getTime() -
        new Date(a.dateOfExamination).getTime()
    );
  }

  // Returns the axios params for getting patient examination cards assigned to the doctor.
  get patientExaminationCardsAssignedToDoctorAxiosParams() {
    const params = new URLSearchParams();
    params.append("year", this.year.toString());
    params.append("month", this.month.toString());
    params.append("studentId", this.studentId ?? "");
    return params;
  }

  // Clears the patientExaminationCardDetails property.
  clearPatientExaminationCardDetails() {
    this.patientExaminationCardDetails = null;
  }

  // Clears the patientExaminationCards property.
  clearPatientExaminationCards() {
    this.patientExaminationCards.clear();
  }

  // Clears the patientExaminationCardsAssignedToDoctor property.
  clearPatientExaminationCardsAssignedToDoctor() {
    this.patientExaminationCardsAssignedToDoctor.clear();
  }

  /**
   * Creates a patient examination card by a doctor.
   *
   * @param {string} patientId - The ID of the patient.
   * @param {PatientExaminationCardByDoctorFormValues} values - The values for the patient examination card.
   * @returns {Promise<void>} - A promise that resolves when the patient examination card is created.
   * @throws {Error} - If an error occurs while creating the patient examination card.
   */
  createPatientExaminationCardByDoctor = async (
    patientId: string,
    values: PatientExaminationCardByDoctorFormValues
  ) => {
    this.loading.createPatientExaminationCardByDoctor = true;
    try {
      const patientExaminationCard =
        await axiosAgent.PatientExamintionCardOperations.createPatientExaminationCardByDoctor(
          patientId,
          values
        );
      runInAction(() => {
        this.patientExaminationCards.set(
          patientExaminationCard.id,
          patientExaminationCard
        );
        this.loading.createPatientExaminationCardByDoctor = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.createPatientExaminationCardByDoctor = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Creates a patient examination card by a student.
   *
   * @param {string} patientId - The ID of the patient.
   * @param {PatientExaminationCardByStudentFormValues} values - The values for the patient examination card.
   * @returns {Promise<void>} - A promise that resolves when the patient examination card is created.
   * @throws {Error} - If an error occurs while creating the patient examination card.
   */
  createPatientExaminationCardByStudent = async (
    patientId: string,
    values: PatientExaminationCardByStudentFormValues
  ) => {
    this.loading.createPatientExaminationCardByStudent = true;
    try {
      const patientExaminationCard =
        await axiosAgent.PatientExamintionCardOperations.createPatientExaminationCardByStudent(
          patientId,
          values
        );
      runInAction(() => {
        this.patientExaminationCards.set(
          patientExaminationCard.id,
          patientExaminationCard
        );
        this.loading.createPatientExaminationCardByStudent = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.createPatientExaminationCardByStudent = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Retrieves the examination cards for a specific patient.
   *
   * @param patientId - The ID of the patient.
   * @returns A promise that resolves to the patient examination cards.
   * @throws If an error occurs while retrieving the examination cards.
   */
  getPatientExaminationCards = async (patientId: string) => {
    this.loading.getPatientExaminationCards = true;
    try {
      const patientExaminationCards =
        await axiosAgent.PatientExamintionCardOperations.getPatientExaminationCards(
          patientId
        );
      runInAction(() => {
        this.setPatientExaminationCards(patientExaminationCards);
        this.loading.getPatientExaminationCards = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.getPatientExaminationCards = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Retrieves the patient examination cards assigned to a doctor.
   *
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   * @throws {Error} If an error occurs during the retrieval process.
   */
  getPatientExaminationCardsAssignedToDoctor = async () => {
    this.loading.getPatientExaminationCardsAssignedToDoctor = true;
    try {
      const patientExaminationCards =
        await axiosAgent.PatientExamintionCardOperations.getPatientExaminationCardsAssignedToDoctor(
          this.patientExaminationCardsAssignedToDoctorAxiosParams
        );
      runInAction(() => {
        this.clearPatientExaminationCardsAssignedToDoctor();
        this.setPatientExaminationCardsAssignedToDoctor(
          patientExaminationCards
        );
        this.loading.getPatientExaminationCardsAssignedToDoctor = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.getPatientExaminationCardsAssignedToDoctor = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Retrieves the details of a patient examination card.
   *
   * @param {string} cardId - The ID of the examination card.
   * @returns {Promise<void>} - A promise that resolves when the details are retrieved.
   * @throws {Error} - If an error occurs while retrieving the details.
   */
  getPatientExaminationCardDetails = async (cardId: string) => {
    this.loading.getPatientExaminationCardDetails = true;
    const card = this.getExaminationCardById(cardId);
    if (card) {
      this.setPatientExaminationCardDetails(card);
      this.loading.getPatientExaminationCardDetails = false;
      return;
    }
    try {
      const patientExaminationCard =
        await axiosAgent.PatientExamintionCardOperations.getPatientExaminationCardDetails(
          cardId
        );
      runInAction(() => {
        this.setPatientExaminationCardDetails(patientExaminationCard);
        this.loading.getPatientExaminationCardDetails = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.getPatientExaminationCardDetails = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Comments on a patient examination card.
   *
   * @param {string} cardId - The ID of the patient examination card.
   * @param {string} comment - The comment to be added.
   * @returns {Promise<void>} - A promise that resolves when the comment is successfully added.
   * @throws {Error} - If an error occurs while adding the comment.
   */
  commentPatientExaminationCard = async (cardId: string, comment: string) => {
    this.loading.commentPatientExaminationCard = true;
    try {
      await axiosAgent.PatientExamintionCardOperations.commentPatientExaminationCard(
        cardId,
        comment
      );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          const user = store.userStore.user;
          if (user?.role === "Student") {
            this.patientExaminationCardDetails.studentComment = comment;
          } else {
            this.patientExaminationCardDetails.doctorComment = comment;
          }
        }
        this.loading.commentPatientExaminationCard = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.commentPatientExaminationCard = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Sends a comment to the API for a patient examination card.
   *
   * @param {string} cardId - The ID of the patient examination card.
   * @param {string} comment - The comment to be sent to the API.
   * @returns {Promise<void>} - A promise that resolves when the comment is successfully sent.
   * @throws {Error} - If an error occurs while sending the comment.
   */
  commentAPIForm = async (cardId: string, comment: string) => {
    this.loading.commentAPIForm = true;
    try {
      await axiosAgent.PatientExamintionCardOperations.commentAPIForm(
        cardId,
        comment
      );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          const user = store.userStore.user;
          if (user?.role === "Student") {
            this.patientExaminationCardDetails.patientExaminationResult.api.studentComment =
              comment;
          } else {
            this.patientExaminationCardDetails.patientExaminationResult.api.doctorComment =
              comment;
          }
        }
        this.loading.commentAPIForm = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.commentAPIForm = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Adds a comment to the bleeding form of a patient examination card.
   *
   * @param cardId - The ID of the patient examination card.
   * @param comment - The comment to be added.
   * @returns A promise that resolves when the comment is successfully added.
   * @throws If an error occurs while adding the comment.
   */
  commentBleedingForm = async (cardId: string, comment: string) => {
    this.loading.commentBleedingForm = true;
    try {
      await axiosAgent.PatientExamintionCardOperations.commentBleedingForm(
        cardId,
        comment
      );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          const user = store.userStore.user;
          if (user?.role === "Student") {
            this.patientExaminationCardDetails.patientExaminationResult.bleeding.studentComment =
              comment;
          } else {
            this.patientExaminationCardDetails.patientExaminationResult.bleeding.doctorComment =
              comment;
          }
        }
        this.loading.commentBleedingForm = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.commentBleedingForm = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Adds a comment to the Bewe form of a patient examination card.
   *
   * @param cardId - The ID of the patient examination card.
   * @param comment - The comment to be added.
   * @throws {Error} If an error occurs while adding the comment.
   */
  commentBeweForm = async (cardId: string, comment: string) => {
    this.loading.commentBeweForm = true;
    try {
      await axiosAgent.PatientExamintionCardOperations.commentBeweForm(
        cardId,
        comment
      );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          const user = store.userStore.user;
          if (user?.role === "Student") {
            this.patientExaminationCardDetails.patientExaminationResult.bewe.studentComment =
              comment;
          } else {
            this.patientExaminationCardDetails.patientExaminationResult.bewe.doctorComment =
              comment;
          }
        }
        this.loading.commentBeweForm = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.commentBeweForm = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Adds a comment to the DMFT_DMFS form of a patient examination card.
   *
   * @param cardId - The ID of the patient examination card.
   * @param comment - The comment to be added.
   * @throws {Error} If an error occurs while adding the comment.
   */
  commentDMFT_DMFSForm = async (cardId: string, comment: string) => {
    this.loading.commentDMFT_DMFSForm = true;
    try {
      await axiosAgent.PatientExamintionCardOperations.commentDMFT_DMFSForm(
        cardId,
        comment
      );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          const user = store.userStore.user;
          if (user?.role === "Student") {
            this.patientExaminationCardDetails.patientExaminationResult.dmfT_DMFS.studentComment =
              comment;
          } else {
            this.patientExaminationCardDetails.patientExaminationResult.dmfT_DMFS.doctorComment =
              comment;
          }
        }
        this.loading.commentDMFT_DMFSForm = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.commentDMFT_DMFSForm = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Updates the API form for a patient examination card.
   *
   * @param cardId - The ID of the card.
   * @param values - The values to update the API form with.
   * @returns A promise that resolves when the API form is successfully updated.
   * @throws If an error occurs during the update process.
   */
  updateAPIForm = async (
    cardId: string,
    values: APIBleedingAssessmentModel
  ) => {
    this.loading.updateAPIForm = true;
    try {
      const apiUpdateResponse =
        await axiosAgent.PatientExamintionCardOperations.updateAPIForm(
          cardId,
          values
        );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          this.patientExaminationCardDetails.patientExaminationResult.api.assessmentModel =
            values;

          this.patientExaminationCardDetails.patientExaminationResult.api.apiResult =
            apiUpdateResponse.apiResult;

          this.patientExaminationCardDetails.patientExaminationResult.api.maxilla =
            apiUpdateResponse.maxilla;

          this.patientExaminationCardDetails.patientExaminationResult.api.mandible =
            apiUpdateResponse.mandible;
        }
        this.loading.updateAPIForm = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.updateAPIForm = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Updates the bleeding form for a patient examination card.
   *
   * @param {string} cardId - The ID of the patient examination card.
   * @param {APIBleedingAssessmentModel} values - The values to update the bleeding form with.
   * @returns {Promise<void>} - A promise that resolves when the bleeding form is successfully updated.
   * @throws {Error} - If an error occurs while updating the bleeding form.
   */
  updateBleedingForm = async (
    cardId: string,
    values: APIBleedingAssessmentModel
  ) => {
    this.loading.updateBleedingForm = true;
    try {
      const bleedingUpdateResponse =
        await axiosAgent.PatientExamintionCardOperations.updateBleedingForm(
          cardId,
          values
        );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          this.patientExaminationCardDetails.patientExaminationResult.bleeding.assessmentModel =
            values;

          this.patientExaminationCardDetails.patientExaminationResult.bleeding.bleedingResult =
            bleedingUpdateResponse.bleedingResult;

          this.patientExaminationCardDetails.patientExaminationResult.bleeding.maxilla =
            bleedingUpdateResponse.maxilla;

          this.patientExaminationCardDetails.patientExaminationResult.bleeding.mandible =
            bleedingUpdateResponse.mandible;
        }
        this.loading.updateBleedingForm = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.updateBleedingForm = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Updates the Bewe form for a patient examination card.
   *
   * @param {string} cardId - The ID of the card.
   * @param {BeweAssessmentModel} values - The updated Bewe assessment model.
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   * @throws {Error} - If an error occurs during the update process.
   */
  updateBeweForm = async (cardId: string, values: BeweAssessmentModel) => {
    this.loading.updateBeweForm = true;
    try {
      const beweUpdateResponse =
        await axiosAgent.PatientExamintionCardOperations.updateBeweForm(
          cardId,
          values
        );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          this.patientExaminationCardDetails.patientExaminationResult.bewe.assessmentModel =
            values;

          this.patientExaminationCardDetails.patientExaminationResult.bewe.beweResult =
            beweUpdateResponse.beweResult;
          this.patientExaminationCardDetails.patientExaminationResult.bewe.sectant1 =
            beweUpdateResponse.sectant1;
          this.patientExaminationCardDetails.patientExaminationResult.bewe.sectant2 =
            beweUpdateResponse.sectant2;
          this.patientExaminationCardDetails.patientExaminationResult.bewe.sectant3 =
            beweUpdateResponse.sectant3;
          this.patientExaminationCardDetails.patientExaminationResult.bewe.sectant4 =
            beweUpdateResponse.sectant4;
          this.patientExaminationCardDetails.patientExaminationResult.bewe.sectant5 =
            beweUpdateResponse.sectant5;
          this.patientExaminationCardDetails.patientExaminationResult.bewe.sectant6 =
            beweUpdateResponse.sectant6;
        }
        this.loading.updateBeweForm = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.updateBeweForm = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Updates the DMFT_DMFS form for a patient examination card.
   *
   * @param cardId - The ID of the patient examination card.
   * @param values - The values to update the form with.
   * @returns A promise that resolves when the form is successfully updated.
   * @throws An error if the form update fails.
   */
  updateDMFT_DMFSForm = async (
    cardId: string,
    values: UpdateDMFT_DMFSFormValues
  ) => {
    this.loading.updateDMFT_DMFSForm = true;
    try {
      const dmft_dmfsUpdateResponse =
        await axiosAgent.PatientExamintionCardOperations.updateDMFT_DMFSForm(
          cardId,
          values
        );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          this.patientExaminationCardDetails.patientExaminationResult.dmfT_DMFS.assessmentModel =
            values.assessmentModel;

          this.patientExaminationCardDetails.patientExaminationResult.dmfT_DMFS.dmftResult =
            dmft_dmfsUpdateResponse.dmftResult;

          this.patientExaminationCardDetails.patientExaminationResult.dmfT_DMFS.dmfsResult =
            dmft_dmfsUpdateResponse.dmfsResult;

          this.patientExaminationCardDetails.patientExaminationResult.dmfT_DMFS.prostheticStatus =
            values.prostheticStatus;
        }
        this.loading.updateDMFT_DMFSForm = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.updateDMFT_DMFSForm = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Updates the risk factor assessment for a patient examination card.
   *
   * @param {string} cardId - The ID of the card to update.
   * @param {RiskFactorAssessmentModel} values - The updated risk factor assessment values.
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   * @throws {Error} - If an error occurs during the update process.
   */
  updateRiskFactorAssessment = async (
    cardId: string,
    values: RiskFactorAssessmentModel
  ) => {
    this.loading.updateRiskAssessment = true;
    try {
      await axiosAgent.PatientExamintionCardOperations.updateRiskFactorAssessment(
        cardId,
        values
      );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          this.patientExaminationCardDetails.riskFactorAssessment.riskFactorAssessmentModel =
            values;
        }
        this.loading.updateRiskAssessment = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.updateRiskAssessment = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Updates the summary of a patient examination card.
   *
   * @param {string} cardId - The ID of the card to update.
   * @param {Summary} summary - The new summary to set.
   * @returns {Promise<void>} - A promise that resolves when the summary is updated successfully.
   * @throws {Error} - If an error occurs while updating the summary.
   */
  updateSummary = async (cardId: string, summary: Summary) => {
    this.loading.updatePatientExaminationCardSummary = true;
    try {
      await axiosAgent.PatientExamintionCardOperations.updatePatientExaminationCardSummary(
        cardId,
        summary
      );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          this.patientExaminationCardDetails.summary = summary;
        }
        this.loading.updatePatientExaminationCardSummary = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.updatePatientExaminationCardSummary = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Deletes a patient examination card.
   *
   * @param {string} cardId - The ID of the card to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the card is successfully deleted.
   * @throws {Error} - If an error occurs during the deletion process.
   */
  deletePatientExaminationCard = async (cardId: string) => {
    this.loading.deletePatientExaminationCard = true;
    try {
      await axiosAgent.PatientExamintionCardOperations.deletePatientExaminationCard(
        cardId
      );
      runInAction(() => {
        this.patientExaminationCards.delete(cardId);
        this.loading.deletePatientExaminationCard = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.deletePatientExaminationCard = false;
      });
      console.error(error);
      throw error;
    }
  };

  /**
   * Grades a patient examination card.
   *
   * @param {string} cardId - The ID of the card to be graded.
   * @param {number} grade - The grade to assign to the card.
   * @returns {Promise<void>} - A promise that resolves when the grading is complete.
   * @throws {Error} - If an error occurs during the grading process.
   */
  gradePatientExaminationCard = async (cardId: string, grade: number) => {
    this.loading.gradePatientExaminationCard = true;
    try {
      await axiosAgent.PatientExamintionCardOperations.gradePatientExaminationCard(
        cardId,
        grade
      );
      runInAction(() => {
        if (this.patientExaminationCardDetails) {
          this.patientExaminationCardDetails.totalScore = grade;
        }
        this.loading.gradePatientExaminationCard = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading.gradePatientExaminationCard = false;
      });
      console.error(error);
      throw error;
    }
  };
}
