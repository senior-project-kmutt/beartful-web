export interface Review {
  purchaseOrderId: string;
  score: number;
  comment?: string;
  reviewBy: string;
  reviewTo: string;
}

export interface IGetFreelanceReview {
  score: number;
  comment?: string;
  reviewerInfo: IReviewerInfo;
  createdAt: Date
}

export interface IReviewerInfo {
  profileImage: string;
  username: string
}