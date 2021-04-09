// export const usernamePattern = /^(?![0-9._])(?!.*[0-9._]$)(?!.*\d_)(?!.*_\d)[a-zA-Z0-9_]+$/
// export const usernamePattern = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
export const usernamePattern = /^[a-zA-Z][a-zA-Z0-9-_]{3,32}$/
export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
