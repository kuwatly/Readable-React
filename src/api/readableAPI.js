export const API = "http://localhost:3001";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
};

export const UP_VOTE_OPTION = "upVote";
export const DOWN_VOTE_OPTION = "downVote";