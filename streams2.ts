(async () => {
  console.time("copy");

  const srcFile = await fs.open("text-gigantic.txt", "r");
  const destFile = await fs.open("text-copy.txt", "w");


})();
