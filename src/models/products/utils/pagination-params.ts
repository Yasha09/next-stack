import {AuthRequest} from "../../../common/interfaces";

export const getPageParams = (req: AuthRequest) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    return {
        page,
        limit
    }
}