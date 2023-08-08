import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const ProgressBar = () => {

    // const [progress, setProgress] = useState(13)

    // useEffect(() => {
    //     const timer = setTimeout(() => setProgress(66), 500)
    //     return () => clearTimeout(timer)
    //   }, [])


  return (
    <>
      <div className="mb-4 pb-4">
        <Progress value={33} />
        <p>{}</p>
      </div>
    </>
  );
};

export default ProgressBar;
