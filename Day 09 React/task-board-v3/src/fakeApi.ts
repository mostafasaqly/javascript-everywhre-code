// A pretend server: waits a little, and fails if the title contains "fail".
// Lets us practise loading and error states without a real backend.
export function pretendToSave(title: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (title.toLowerCase().includes("fail")) {
        reject(new Error("The server refused to save this task. Try another title."));
      } else {
        resolve();
      }
    }, 700);
  });
}