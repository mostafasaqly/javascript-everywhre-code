export const OPTIONS = ["React", "Vue", "Angular"] as const;
export type Option = (typeof OPTIONS)[number];

export interface PollState {
  votes: Record<Option, number>;
  myVote: Option | null;
}

export type PollAction =
  | { type: "voted"; option: Option }
  | { type: "reset" };

export const INITIAL_POLL: PollState = {
  votes: { React: 0, Vue: 0, Angular: 0 },
  myVote: null,
};

export function pollReducer(state: PollState, action: PollAction): PollState {
  switch (action.type) {
    case "voted":
      if (state.myVote !== null) return state; // already voted → no change, same object
      return {
        votes: { ...state.votes, [action.option]: state.votes[action.option] + 1 },
        myVote: action.option,
      };
    case "reset":
      return INITIAL_POLL;
  }
}