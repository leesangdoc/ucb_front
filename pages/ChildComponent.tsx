import React, { useEffect } from 'react';

const ChildComponent: React.FC = () => {
  // 부모 창으로부터 메시지 수신하는 이벤트 핸들러
  const receiveMessageFromParent = (event: MessageEvent) => {
    if (event.source === window.parent) {
      const message = event.data;
      console.log('부모 창으로부터 받은 메시지:', message);
    }
  };

  // 부모 창으로 메시지 보내는 함수
  const sendMessageToParent = () => {
    const message = '안녕 부모 창!';
    window.parent.postMessage(message, '*');
  };

  // 이벤트 핸들러 등록
  useEffect(() => {
    window.addEventListener('message', receiveMessageFromParent);
    return () => {
      window.removeEventListener('message', receiveMessageFromParent);
    };
  }, []);

  return <div><div>자식 창 컨텐츠</div><button onClick={sendMessageToParent}>부모 창으로 메시지 보내기</button></div>;

};

export default ChildComponent;
