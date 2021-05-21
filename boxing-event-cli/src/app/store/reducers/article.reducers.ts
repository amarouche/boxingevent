import {All, ArticleActionTypes} from '../actions/article.actions';
import {Article} from '../../models/article';

export interface State {
  currentArticle: Article | null;
  articleList: Article[] | null;
  slideArticleList: Article[] | null;
  currentPage: number;
  totalPages: number | null;
}

export const initialState: State = {
  currentArticle: null,
  articleList: [],
  slideArticleList: [],
  currentPage: 1,
  totalPages: null,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case ArticleActionTypes.ADD_SUCCESS:
    case ArticleActionTypes.PUBLISH_SUCCESS:
    case ArticleActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        currentArticle: action.payload
      };
    }
    case ArticleActionTypes.LOAD_LIST_FROM_DB_SUCCESS: {
      return {
        ...state,
        articleList: action.payload.content,
        currentPage: action.payload.number,
        totalPages: action.payload.totalPages
      };
    }
    case ArticleActionTypes.LOAD_SLIDE_ARTICLES_SUCCESS: {
      return {
        ...state,
        slideArticleList: action.payload
      };
    }
    case ArticleActionTypes.LOAD_LIST_SUCCESS: {
      return {
        ...state,
        articleList: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

