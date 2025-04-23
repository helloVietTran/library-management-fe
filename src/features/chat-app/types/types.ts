export interface User {
  _id: string;
  username: string;
  profilePic: string;
}

export interface MessageType {
  _id: string;
  text?: string;
  img?: string;
  sender: string;
  seen?: boolean;
}

export interface ConversationType {
  _id: string;
  participants: User[];
  lastMessage: {
    text: string;
    sender: string;
    seen?: boolean;
  };
  mock?: boolean;
}

// Mock data ban đầu
export const mockUser: User = {
  _id: "u1",
  username: "CurrentUser",
  profilePic: "https://placehold.co/600x400/png",
};

export const mockConversations: ConversationType[] = [
  {
    _id: "c1",
    participants: [
      {
        _id: "u2",
        username: "Alice",
        profilePic: "https://placehold.co/600x400/png",
      },
    ],
    lastMessage: {
      text: "Hello from Alice",
      sender: "u2",
      seen: true,
    },
  },
  {
    _id: "c2",
    participants: [
      {
        _id: "u3",
        username: "Bob",
        profilePic: "https://placehold.co/600x400/png",
      },
    ],
    lastMessage: {
      text: "Hi there!",
      sender: "u3",
      seen: false,
    },
  },
];

// Mock messages theo conversation
export const mockMessages: { [key: string]: MessageType[] } = {
  c1: [
    { _id: "m1", text: "Hello from Alice", sender: "u2", seen: true },
    { _id: "m2", text: "Hi Alice!", sender: "u1", seen: true },
  ],
  c2: [
    { _id: "m3", text: "Hi there!", sender: "u3", seen: false },
  ],
};
