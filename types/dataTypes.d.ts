type categoryType = {
  id?: string;
  name: string;
};

type menuInfoType = {
  id?: string;
  img: string;
  title: string;
  subText?: string;
  price: number;
  categories: categoryType[];
};

type cartType = {
  id?: string;
  title: string;
  price: number;
  count: number;
};

type staffMenuType = {
  id?: string;
  title: string;
};

type staffCartType = {
  id?: string;
  title: string;
  count: number;
};

type musicType = {
  id?: string;
  title: string;
  artist: string;
};

type feedbackType = {
  id?: string;
  feedback: string;
  rating: number;
};

type screenType = "MainScreen" | "StaffCallScreen" | "MusicRequestScreen" | "FeedbackScreen";
