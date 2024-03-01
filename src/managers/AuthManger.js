export const loginUser = (user) => {
  return fetch("http://LB-271377299.us-east-1.elb.amazonaws.com:8000/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(user)
  })
  .then(res => {
      if (!res.ok) {
          throw new Error('Failed to login');
      }
      return res.json();
  })
  .catch(error => {
      console.error('Error logging in:', error);
      throw error; // Rethrow the error to propagate it to the caller
  });
}

  
  export const registerUser = (user) => {
    return fetch("http://3.84.82.120:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
  }
  