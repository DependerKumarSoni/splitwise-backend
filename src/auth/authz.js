import { NotFoundError } from "../utils/errorUtils";
import { ForbiddenError } from "../utils/errorUtils";

export async function assertMembership(repo, groupId, userEmail) {
    const group = await repo.getGroup(groupId);
    if (!group) throw new NotFoundError(`Group ${groupId} not found`);
    if (!group.memberIds.includes(userEmail)) {
        throw new ForbiddenError('You are not a part of this group');
    }
    return group;
}