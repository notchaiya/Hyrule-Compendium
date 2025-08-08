type DescriptionProps = {
  str: string;
};

export default function Description({ str }: DescriptionProps) {
  const wordCount = 40;
  const words = str.split(/\s+/);
  const isLong = words.length > wordCount;

  const truncatedText = isLong ? words.slice(0, wordCount).join(" ") : str;

  return (
    <p className="mb-3 mx-3">
      {truncatedText}...
      {/* <button onClick={() => setIsExpended((prev) => !prev)}>show more</button> */}
    </p>
  );
}
