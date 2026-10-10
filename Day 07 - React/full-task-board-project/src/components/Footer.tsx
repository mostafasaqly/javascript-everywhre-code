interface FooterProps {
  total: number;

  completed: number;

  onClearCompleted: () => void;
}

export function Footer({ total, completed, onClearCompleted }: FooterProps) {
  return (
    <footer className="footer">
      <p>
        {completed} of {total} completed
      </p>

      {completed > 0 && (
        <button className="link-btn" onClick={onClearCompleted}>Clear Completed</button>
      )}
    </footer>
  );
}
