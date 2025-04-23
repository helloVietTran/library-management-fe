const randomColor = () => {
  const colors = [
    "#f56a00",
    "#7265e6", 
    "#ffbf00", 
    "#00a2ae", 
    "#87d068", 
    "#1890ff", 
    "#eb2f96", 
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export default randomColor;
