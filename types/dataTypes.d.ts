type categoryType = string;

type menuInfoType = {
  name: string;
  categoryName: string;
  price: number;
  description: string;
  imageUrl: string;
};

type cartType = {
  name: string;
  price: number;
  count: number;
};

type staffMenuType = {
  id: number;
  optionName: string;
  ownerId: number;
};

type staffCartType = {
  id: number;
  optionName: string;
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
