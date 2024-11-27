import { useEffect, useState } from "react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const handleBeforeInstallPrompt = (e: Event) => {
    console.log("e", e);
    e.preventDefault();
    setDeferredPrompt(e);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("사용자가 설치 프롬프트에 동의했습니다.");
        } else {
          console.log("사용자가 설치 프롬프트를 무시했습니다. ");
        }

        setDeferredPrompt(null);
      });
    }
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  return (
    <>
      {deferredPrompt && (
        <button
          className="w-full rounded-lg bg-emerald-500 p-3 text-slate-50 w-full"
          onClick={handleInstallClick}
        >
          앱 설치하기
        </button>
      )}
    </>
  );
};

export default PWAInstallPrompt;
