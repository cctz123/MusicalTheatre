export type WitnessShow = {
  playbillImage?: string;
  revival: boolean;
  attendedRevival?: boolean;
};

export function attendedShow(show: Pick<WitnessShow, "playbillImage">) {
  return Boolean(show.playbillImage);
}

export function witnessLabel(show: WitnessShow) {
  if (attendedShow(show)) {
    if (show.attendedRevival) return "Attended Revival";
    return "Attended Original";
  }
  return show.revival ? "Researched Revival" : "Researched Original";
}

export function witnessCaption(show: WitnessShow) {
  if (attendedShow(show)) {
    if (show.attendedRevival) {
      return "Personal photo from a later revival I attended, not from the original production.";
    }
    return "Personal photo from the night at the theatre.";
  }
  if (show.revival) {
    return "No personal Playbill in the archive. Official covers are not used; this exhibition poster stands in.";
  }
  return "I did not attend this original production. Official Playbills are not used; this exhibition poster stands in.";
}
