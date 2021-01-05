export const handleEnterKey = (onClick) => ({ key }) => {
    if (key === "Enter") { 
      onClick(); 
    }
  };