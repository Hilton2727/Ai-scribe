
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
}

interface ChatHistory {
  id: string;
  userId: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

class DataService {
  private users: User[] = [];
  private currentUser: User | null = null;
  private chatHistory: ChatHistory[] = [];
  private authListeners: ((authState: AuthState) => void)[] = [];

  constructor() {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('chatgpt_users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }

    // Load current user from localStorage
    const savedAuth = localStorage.getItem('chatgpt_auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      this.currentUser = authData.user;
    }

    // Load chat history from localStorage
    const savedChats = localStorage.getItem('chatgpt_chats');
    if (savedChats) {
      this.chatHistory = JSON.parse(savedChats);
    }
  }

  private saveUsers() {
    localStorage.setItem('chatgpt_users', JSON.stringify(this.users));
  }

  private saveAuth() {
    localStorage.setItem('chatgpt_auth', JSON.stringify({
      user: this.currentUser,
      isAuthenticated: this.currentUser !== null
    }));
  }

  private saveChats() {
    localStorage.setItem('chatgpt_chats', JSON.stringify(this.chatHistory));
  }

  private notifyAuthListeners() {
    const authState: AuthState = {
      isAuthenticated: this.currentUser !== null,
      user: this.currentUser
    };
    this.authListeners.forEach(listener => listener(authState));
  }

  signup(email: string, password: string, firstName: string, lastName: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = this.users.find(user => user.email === email);
        if (existingUser) {
          resolve({ success: false, message: 'User already exists with this email' });
          return;
        }

        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          email,
          password,
          firstName,
          lastName,
          createdAt: new Date()
        };

        this.users.push(newUser);
        this.currentUser = newUser;
        this.saveUsers();
        this.saveAuth();
        this.notifyAuthListeners();

        resolve({ success: true, message: 'Account created successfully' });
      }, 1000);
    });
  }

  login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
          this.currentUser = user;
          this.saveAuth();
          this.notifyAuthListeners();
          resolve({ success: true, message: 'Login successful' });
        } else {
          resolve({ success: false, message: 'Invalid email or password' });
        }
      }, 1000);
    });
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('chatgpt_auth');
    this.notifyAuthListeners();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  onAuthStateChange(listener: (authState: AuthState) => void): () => void {
    this.authListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.authListeners.indexOf(listener);
      if (index > -1) {
        this.authListeners.splice(index, 1);
      }
    };
  }

  // Chat history methods
  getChatHistory(): ChatHistory[] {
    if (!this.currentUser) return [];
    return this.chatHistory.filter(chat => chat.userId === this.currentUser.id);
  }

  addChatToHistory(title: string, lastMessage: string): void {
    if (!this.currentUser) return;
    
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      userId: this.currentUser.id,
      title,
      lastMessage,
      timestamp: new Date()
    };
    
    this.chatHistory.unshift(newChat);
    this.saveChats();
  }

  // Check if app is running as PWA
  isPWA(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone ||
           document.referrer.includes('android-app://');
  }
}

export const dataService = new DataService();
