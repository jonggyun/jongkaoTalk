export const userSignUp = async ({
  id,
  name,
  password,
  profile,
  description,
}: {
  id: string;
  name: string;
  password: string;
  profile: string;
  description: string;
}) => {
  try {
    console.log('userSignUp');
  } catch (e) {
    console.log('error');
    throw new Error(e);
  }
};
