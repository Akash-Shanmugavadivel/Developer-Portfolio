import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CornerDownLeft, Terminal } from "lucide-react";

type Entry = { id: number; text: string; command?: boolean; link?: string; linkLabel?: string; download?: boolean };

const githubUrl = "https://github.com/Akash-Shanmugavadivel";
const linkedinUrl = "https://www.linkedin.com/in/akash-shanmugavadivel";
const email = "akashkumaran15@gmail.com";

const initialEntries: Entry[] = [
  { id: 0, text: "Welcome to Akash's café terminal." },
  { id: 1, text: "Type help to see what you can explore." },
];

export default function TerminalContact() {
  const [command, setCommand] = useState("");
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const nextId = useRef(2);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [entries]);

  const runCommand = (raw: string) => {
    const value = raw.trim().toLowerCase();
    if (!value) return;
    setCommand("");
    if (value === "clear") {
      setEntries([{ id: nextId.current++, text: "Terminal cleared. Type help to start again." }]);
      return;
    }

    const next: Entry[] = [{ id: nextId.current++, text: value, command: true }];
    switch (value) {
      case "help":
        next.push({ id: nextId.current++, text: "Commands: about · skills · projects · contact · github · linkedin · email · resume · clear" });
        break;
      case "about":
        next.push({ id: nextId.current++, text: "Akash builds backend APIs, cloud automation, and useful AI tools." });
        break;
      case "projects":
        next.push({ id: nextId.current++, text: "Start with the featured projects in the menu.", link: "#work", linkLabel: "Browse projects" });
        break;
      case "skills":
        next.push({ id: nextId.current++, text: "The coffee menu pairs familiar brews with Akash's tools.", link: "#skills", linkLabel: "Open skills menu" });
        break;
      case "contact":
        next.push({ id: nextId.current++, text: "Pull up a chair and send Akash a note.", link: `mailto:${email}`, linkLabel: "Write an email" });
        break;
      case "github":
        next.push({ id: nextId.current++, text: "Explore Akash's repositories.", link: githubUrl, linkLabel: "Open GitHub" });
        break;
      case "linkedin":
        next.push({ id: nextId.current++, text: "Connect with Akash on LinkedIn.", link: linkedinUrl, linkLabel: "Open LinkedIn" });
        break;
      case "email":
        next.push({ id: nextId.current++, text: email, link: `mailto:${email}`, linkLabel: "Write an email" });
        break;
      case "resume":
        next.push({ id: nextId.current++, text: "A quick overview of Akash's experience.", link: "/Akash_S_Resume.pdf", linkLabel: "Download résumé", download: true });
        break;
      default:
        next.push({ id: nextId.current++, text: `Unknown command: ${value}. Type help for the menu.` });
    }
    setEntries((previous) => [...previous.slice(-12), ...next]);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(command);
  };

  return (
    <div className="cafe-terminal" aria-label="Interactive contact terminal">
      <div className="terminal-bar"><span><Terminal size={17} /> akash@java-cafe:~</span><span className="terminal-lights" aria-hidden="true"><i /><i /><i /></span></div>
      <div className="terminal-output" ref={outputRef} aria-live="polite" aria-relevant="additions text">
        {entries.map((entry) => <div className={`terminal-entry${entry.command ? " terminal-command" : ""}`} key={entry.id}>
          <span className="terminal-prompt" aria-hidden="true">{entry.command ? "$" : "›"}</span>
          <span>{entry.text}{entry.link && <a href={entry.link} target={entry.link.startsWith("http") ? "_blank" : undefined} rel={entry.link.startsWith("http") ? "noopener noreferrer" : undefined} download={entry.download || undefined}>{entry.linkLabel} <ArrowUpRight size={13} /></a>}</span>
        </div>)}
      </div>
      <form className="terminal-form" onSubmit={submit}><label htmlFor="cafe-terminal-input">$ <span className="sr-only">Terminal command</span></label><input id="cafe-terminal-input" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Type a command…" autoComplete="off" spellCheck={false} /><button type="submit" aria-label="Run terminal command"><CornerDownLeft size={17} /></button></form>
      <div className="terminal-shortcuts" aria-label="Try a command">{["help", "skills", "projects", "contact"].map((item) => <button type="button" key={item} onClick={() => runCommand(item)}>{item}</button>)}</div>
    </div>
  );
}
