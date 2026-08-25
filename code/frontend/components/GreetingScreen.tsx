"use client";

import { useEffect, useState } from "react";
import styles from "./GreetingScreen.module.css";

type GreetingResponse = {
  text: string;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export function GreetingScreen() {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadGreeting() {
      try {
        const response = await fetch(`${apiBase}/v1/greeting`);
        if (!response.ok) {
          throw new Error(`unexpected response: ${response.status}`);
        }

        const data = (await response.json()) as GreetingResponse;
        if (active) {
          setText(data.text);
        }
      } catch {
        if (active) {
          setText(null);
        }
      }
    }

    void loadGreeting();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className={styles.screen} aria-label="hello-word-15 greeting screen">
      <section className={styles.card} aria-labelledby="greeting-title">
        <h1 className={styles.message} id="greeting-title">
          {text ?? ""}
        </h1>
      </section>
    </main>
  );
}
