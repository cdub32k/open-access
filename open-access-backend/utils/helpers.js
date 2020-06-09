export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function deleteReplies(Type, comm, vid) {
  let replies = await Type.find({ replyId: comm._id });
  let totalDecr = 0;
  if (replies && replies.length) {
    totalDecr += replies.length;
    await asyncForEach(replies, async (reply) => {
      totalDecr += await deleteReplies(Type, reply, vid);
      await reply.delete();
    });
  }
  return totalDecr;
}