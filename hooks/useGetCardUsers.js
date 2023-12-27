import useAxiosPrivate from "./useAxiosPrivate";

export default function useGetCardUsers(user, activity) {
  const axiosPrivate = useAxiosPrivate();
  const cardUsers = async () => {
    try {
      const response = await axiosPrivate.get(
        `${process.env.EXPO_PUBLIC_URL}/gendered-users`,
        {
          params: {
            gender: user?.gender_interest,
            type: user?.type_of_pet,
            userId: user?.user_id,
            address: user?.address_info,
            user_matches: user?.user_matches,
            activity: activity,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };
  return cardUsers;
}
