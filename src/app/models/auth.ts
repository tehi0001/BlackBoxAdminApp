export interface Auth {
	success: boolean;
	message?: string;
	token?: string;
}

export interface AuthRequest {
	email: string;
	password: string;
}
