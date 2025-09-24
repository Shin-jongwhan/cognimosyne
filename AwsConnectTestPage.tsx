import React from "react";

function AwsConnectTestPage() {
  const handleClick = () => {
    console.log("test");
  };

  return (
    <div>
      <button onClick={handleClick}>Test Button</button>
    </div>
  );
}

export default AwsConnectTestPage;
