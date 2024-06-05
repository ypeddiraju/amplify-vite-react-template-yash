import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { useState } from "react";
//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";

//const client = generateClient<Schema>();

function App() {
  /* const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  function deleteTodo(id:string){
    client.models.Todo.delete({id});
  } */
  const [bodyValue, setBodyValue] = useState("");
  const [toMailValue, setToMailValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  //const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    
    const format = {
      queryStringParameters: {
        body: bodyValue,
        tomail: toMailValue,
        subject: subjectValue,
      },
    };

    let url =
      "https://dttv6w8p03.execute-api.us-east-1.amazonaws.com/test1/everytimemailnode";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(format),
    })
      .then((response) => response.json())
      .then((data) => {
          //setShowSuccessMessage(false);
          alert("mail sent successfully");
        
        return data.json();
      })
      .catch(() => null);
  }
  const mystyle = {
    padding: "100px 10px 10px 10px",
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}</h1>
          <div style={mystyle}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label>
                To Mail:
                <input
                  type="mail"
                  value={toMailValue}
                  onChange={(event) => setToMailValue(event.target.value)}
                  style={{
                    padding: "5px",
                    marginRight: "10px",
                    border: "1px solid #ccc",
                    width: "500px",
                  }}
                />
              </label>
              <br />
              <label>
                Subject:
                <input
                  type="text"
                  value={subjectValue}
                  onChange={(event) => setSubjectValue(event.target.value)}
                  style={{
                    padding: "5px",
                    marginRight: "10px",
                    border: "1px solid #ccc",
                    width: "500px",
                  }}
                />
              </label>
              <br />
              <label>Body:</label>
              <textarea
                value={bodyValue}
                onChange={(event) => setBodyValue(event.target.value)}
                rows={10}
                cols={80}
                wrap={"pre"}
                style={{
                  padding: "5px",
                  border: "1px solid #ccc",
                  resize: "vertical",
                  whiteSpace: "pre",
                }}
              />

              <br />

              <button
                type="submit"
                style={{
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Send Mail
              </button>
              {/* <span>{showSuccessMessage && <h3> hola</h3>}</span>
              {showSuccessMessage && (
        <div id="successMessage" style={{ display: 'block' }}>
          Unverified mail
        </div>
      )} */}
            </form>
          </div>
          {/* <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={()=>{deleteTodo(todo.id)}} >{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div> */}
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
