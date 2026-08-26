export type WitnessShow = {
  playbillImage?: string;
  revival: boolean;
};

export function attendedShow(show: Pick<WitnessShow, "playbillImage">) {
  return Boolean(show.playbillImage);
}

export function witnessLabel(show: WitnessShow) {
  if (attendedShow(show)) return "I was there";
  return show.revival ? "Researched revival" : "Researched original";
}

export function witnessCaption(show: WitnessShow) {
  if (attendedShow(show)) {
    return "Personal photo from the night at the theatre.";
  }
  if (show.revival) {
    return "No personal Playbill in the archive. Official covers are not used; this exhibition poster stands in.";
  }
  return "I did not attend this original production. Official Playbills are not used; this exhibition poster stands in.";
}
