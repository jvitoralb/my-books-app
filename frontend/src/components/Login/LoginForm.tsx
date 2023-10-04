import { Button } from '@chakra-ui/react';
import { FormEvent } from 'react';
import { InputControlProps, LoginFormProps } from '../../types';
import InputControl from './InputControl';


function LoginForm({ refetch, setCredentials, isValid, displayWarning, emailWarning, passwordWarning, handleWarnings, fields }: LoginFormProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isValid) {
      refetch();
    } else {
      handleWarnings(fields);
    }
  }

  const inputControlProps: InputControlProps = {
    subject: 'email' || 'password',
    setCredentials,
    displayWarning,
    handleWarnings,
    emailWarning,
    passwordWarning,
  }

  return (
    <form id="login-form" onSubmit={handleFormSubmit} className="flex-center-col">
      <InputControl
        {...inputControlProps}
        subject="email"
      />
      <InputControl
        { ...inputControlProps }
        subject="password"
      />

      <Button id="login-submit" type="submit" m="2">Login</Button>
    </form>
  );
}

export default LoginForm;
// import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
// import { FormEvent, ChangeEvent } from 'react';
// import { LoginFormProps } from '../../types';


// function LoginForm({ refetch, setCredentials, isValid, displayWarning, emailWarning, passwordWarning, handleWarnings, fields }: LoginFormProps) {
//   const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     if (isValid) {
//       refetch();
//     } else {
//       handleWarnings(fields);
//     }
//   }
//   const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (displayWarning) handleWarnings(null);
//     setCredentials(e.target.name, e.target.value);
//   }

//   const isEmailInvalid = displayWarning && emailWarning !== '';
//   const isPasswordInvalid = displayWarning && passwordWarning !== '';

//   return (
//     <form id="login-form" onSubmit={handleFormSubmit} className="flex-center-col">
//       <FormControl m="1" isInvalid={isEmailInvalid}>
//         <FormLabel htmlFor="email">Email address</FormLabel>
//         <Input id="email" name="email" type="email" placeholder="my-mail@books.app" onChange={handleInputsChange} required />
//         {
//           isEmailInvalid ?
//           <FormHelperText mt="0.5">{emailWarning}</FormHelperText> :
//           <FormHelperText mt="0.5">We'll never share your email.</FormHelperText>
//         }
//       </FormControl>

//       <FormControl m="1" isInvalid={isPasswordInvalid}>
//         <FormLabel htmlFor="password">Password</FormLabel>
//         <Input id="password" name="password" type="password" onChange={handleInputsChange} required />
//         {
//           isPasswordInvalid ?
//           <FormHelperText mt="0.5">{passwordWarning}</FormHelperText> :
//           <FormHelperText mt="0.5">We'll never ask for your password.</FormHelperText>
//         }
//       </FormControl>

//       <Button id="login-submit" type="submit" m="2">Login</Button>
//     </form>
//   );
// }

// export default LoginForm;