import AuthForm from '@/components/AuthForm';

type SignInProp = {
    toggleFormType: () => void;
}

const SignIn = ({toggleFormType}: SignInProp) => <AuthForm type='sign-in' toggleFormType={toggleFormType}/>

export default SignIn