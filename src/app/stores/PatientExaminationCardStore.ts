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

export class PatientExaminationCardStore {
  patientExaminationCards = new Map<string, PatientExaminationCard>();
  patientExaminationCardDetails: PatientExaminationCard | null = null;
  patientExaminationCardsAssignedToDoctor = new Map<
    string,
    PatientExaminationCard
  >();

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;
  studentId: string = "";

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

  setPatientExaminationCardDetails(
    patientExaminationCard: PatientExaminationCard
  ) {
    this.patientExaminationCardDetails = patientExaminationCard;
  }

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

  setYear = (year: number) => {
    this.year = year;
  };

  setMonth = (month: number) => {
    this.month = month;
  };

  setStudentId = (studentId: string) => {
    this.studentId = studentId;
  };

  getExaminationCardById(id: string) {
    return Array.from(this.patientExaminationCards.values())
      .concat(Array.from(this.patientExaminationCardsAssignedToDoctor.values()))
      .find((card) => card.id === id);
  }

  getExaminationCardAssignedToDoctorById(id: string) {
    return this.patientExaminationCardsAssignedToDoctor.get(id);
  }

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

  get patientExaminationCardsByDate() {
    return Array.from(this.patientExaminationCards.values()).sort(
      (a, b) =>
        new Date(b.dateOfExamination).getTime() -
        new Date(a.dateOfExamination).getTime()
    );
  }

  get patientExaminationCardsAssignedToDoctorByDate() {
    return Array.from(
      this.patientExaminationCardsAssignedToDoctor.values()
    ).sort(
      (a, b) =>
        new Date(b.dateOfExamination).getTime() -
        new Date(a.dateOfExamination).getTime()
    );
  }

  get patientExaminationCardsAssignedToDoctorAxiosParams() {
    const params = new URLSearchParams();
    params.append("year", this.year.toString());
    params.append("month", this.month.toString());
    params.append("studentId", this.studentId ?? "");
    return params;
  }

  clearPatientExaminationCardDetails() {
    this.patientExaminationCardDetails = null;
  }

  clearPatientExaminationCards() {
    this.patientExaminationCards.clear();
  }

  clearPatientExaminationCardsAssignedToDoctor() {
    this.patientExaminationCardsAssignedToDoctor.clear();
  }

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
            beweUpdateResponse;
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
