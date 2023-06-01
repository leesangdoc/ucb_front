import { atom } from "recoil";
export interface IContentTypes {
  name: string;
  status: boolean;
  message: string;
}

//recoil state 생성
export const contentState = atom<IContentTypes>({
  key: 'content',
  default: {
      name: 'test',
      status: false,
      message: ''
  }
});

const initialState = "";
export const textState = atom<string>({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: initialState, // default value (aka initial value)
});
