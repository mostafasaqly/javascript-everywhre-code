function LoadingState() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="visually-hidden">Loading...</span>
      {[1,2,3].map((item)=> (
        <div key={item} className="skeleton-card"/>
      ))}
    </div>
  );
}
export default LoadingState;