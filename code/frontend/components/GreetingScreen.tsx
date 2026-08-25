"use client";

import styles from "./GreetingScreen.module.css";
import { greetingResponse } from "../lib/mock/display-stored-greeting";

export function GreetingScreen() {
  return (
    <main className={styles.screen} aria-label="hello-word-15 greeting screen">
      <section className={styles.card} aria-labelledby="greeting-title">
        <h1 className={styles.message} id="greeting-title">
          {greetingResponse.text}
        </h1>
      </section>
    </main>
  );
}
