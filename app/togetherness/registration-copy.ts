export type TogethernessRegistrationCopy = {
  approach: string;
  suitableFor: string;
  consultationNote: string;
  followUpNote: string;
};

export const DEFAULT_TOGETHERNESS_REGISTRATION_COPY: TogethernessRegistrationCopy = {
  approach: "我們不急著修好你，而是一起理解你如何在關係裡受傷與靠近。",
  suitableFor: "適合正在親密關係、人際界線、身份認同中感到拉扯的人。",
  consultationNote: "初談約 30 分鐘，會在安靜且不受打擾的空間進行。",
  followUpNote: "我們確認約談時間後會寄信通知，並再以電話與你確認一次。",
};

export function normalizeTogethernessRegistrationCopy(
  value: Partial<TogethernessRegistrationCopy> | null | undefined,
): TogethernessRegistrationCopy {
  return {
    approach: String(value?.approach || DEFAULT_TOGETHERNESS_REGISTRATION_COPY.approach).trim(),
    suitableFor: String(value?.suitableFor || DEFAULT_TOGETHERNESS_REGISTRATION_COPY.suitableFor).trim(),
    consultationNote: String(value?.consultationNote || DEFAULT_TOGETHERNESS_REGISTRATION_COPY.consultationNote).trim(),
    followUpNote: String(value?.followUpNote || DEFAULT_TOGETHERNESS_REGISTRATION_COPY.followUpNote).trim(),
  };
}
