"use client";

import { useEffect, useState } from "react";
import styles from "./GreetingScreen.module.css";

type GreetingResponse = {
  text: string;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export function GreetingScreen() {
  const [text, setText] = useState("");

  useEffect(() => {
    let active = true;

    fetch(`${apiBase}/v1/greeting`)
      .then((response) => response.json())
      .then((data: GreetingResponse) => {
        if (active) {
          setText(data.text);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className={styles.screen} aria-label="hello-word-15 greeting screen">
      <section className={styles.card} aria-labelledby="greeting-title">
        <h1 className={styles.message} id="greeting-title">
          {text}
        </h1>
      </section>
    </main>
  );
}
