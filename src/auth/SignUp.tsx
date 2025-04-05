import AuthForm from '@/components/AuthForm';

type SignUpProp = {
    toggleFormType: () => void;
}

const SignUp = ({toggleFormType}: SignUpProp) => <AuthForm type='sign-up' toggleFormType={toggleFormType}/>

export default SignUp