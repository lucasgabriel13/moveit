import Router from "next/router";
import Head from "next/head";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/pages/login.module.css";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState<string>("");

  const { getInfoUser } = useContext(UserContext);

  useEffect(() => {
    const user = Cookies.get("user");

    if (user) {
      Router.push("/home");
    }
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    getInfoUser(username);
  }

  return (
    <>
      <Head>
        <title> Login | Move.it</title>
      </Head>
      <main className={styles.container}>
        <img
          src="/simbolo.png"
          alt="Move.it"
          className={styles.imgBackground}
        />
        <section className={styles.loginContent}>
          <img src="/logo.png" alt="Logo Move.it" id={styles.logo} />
          <h1>Bem-vindo</h1>
          <div className={styles.githubInfo}>
            <img src="/icons/github.svg" alt="Logo github" />
            <p>Faça login com seu Github para começar</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Digite seu username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className={`${username !== "" && styles.submit}`}
            >
              <img src="/icons/arrow-right.svg" alt="entrar" />
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
