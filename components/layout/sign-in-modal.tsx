import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google, Github } from "@/components/shared/icons";
import Image from "next/image";

import {useTranslations} from 'next-intl';

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  const t = useTranslations('Home');
  
  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <Image
              src="/SNLogoClear.png"
              alt="SN logo"
              width="150"
              height="150"
              className="rounded-sm"
            ></Image>
          <h3 className="font-display text-2xl font-bold">{t('Sign In')}</h3>
          <p className="text-sm text-gray-500">
            {t('Welcome')}
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("google");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Google className="h-5 w-5" />
                {/* {t('Sign In With')}  */}
                <p>Google</p>
              </>
            )}
          </button>

          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("github");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Github className="h-5 w-5" />
                {/* {t('Sign In With')}  */}
                <p>Github</p>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 pb-4 md:px-16">

          <i className="text-xs text-center text-slate-300">
            {t('Agree')}
          </i>
          <p className="text-gray-400 text-center text-xs mt-2">
            <i>SOLIDITYNIRVANA LLC © 2023 </i>
            <br />
            <a href="/terms" className="text-slate-300 hover:text-orange-600">Terms of Use</a> - <a href="/privacy" className="text-slate-300 hover:text-green-500">Privacy Policy</a> - <a href="mailto:hello@soliditynirvana.com" className="text-slate-300 hover:text-cyan-600"> Contact</a>
          </p>
        </div>
        
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
