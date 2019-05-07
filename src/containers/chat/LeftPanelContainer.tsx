import React, { useState } from 'react';

import LeftPanel from '../../components/chat/LeftPanel';

interface LeftPanelContainerProps {}
const LeftPanelContainer: React.FC<LeftPanelContainerProps> = () => {
  const [leftType, setLeftType] = useState('friend');

  const handleLeftType = (e: any) => {
    const { type } = e.currentTarget.dataset;
    console.log('type', type);
    type === 'friend' ? setLeftType('friend') : setLeftType('message');
  };
  return <LeftPanel handleLeftType={handleLeftType} type={leftType} />;
};

export default LeftPanelContainer;
