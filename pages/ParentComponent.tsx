import React, { useRef } from 'react';

const ParentComponent: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 자식 창으로 메시지 보내는 함수
  const sendMessageToChild = () => {
    const message = '안녕 자식 창!';
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*');
    }
  };

  // 자식 창으로부터 메시지 수신하는 이벤트 핸들러
  const receiveMessageFromChild = (event: MessageEvent) => {
    if (event.source === iframeRef.current?.contentWindow) {
      const message = event.data;
      console.log('자식 창으로부터 받은 메시지:', message);
    }
  };

  // 이벤트 핸들러 등록
  React.useEffect(() => {
    window.addEventListener('message', receiveMessageFromChild);
    return () => {
      window.removeEventListener('message', receiveMessageFromChild);
    };
  }, []);

  return (
    <div>
      <button onClick={sendMessageToChild}>자식 창으로 메시지 보내기</button>
      <iframe ref={iframeRef} src="/ChildComponent" title="자식 창" />
    </div>
  );
};

export default ParentComponent;