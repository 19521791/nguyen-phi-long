// Using a Loop
// Complexity: O(n)

function sumToNA(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Using a Mathematical Formula
// Complexity: O(1)

function sumToNB(n: number): number {
  return (n * (n + 1)) / 2;
}

// Using Recursion
// Complexity: O(n)
function sumToNC(n: number): number {
  if (n === 1) return 1;
  return n + sumToNC(n - 1);
}
