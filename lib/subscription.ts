import { auth } from "@clerk/nextjs/server";

import { db } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  /* chatgpt solution */
  // const isValid =
  //   !!orgSubscription.stripePriceId &&
  //   orgSubscription.stripeCurrentPeriodEnd !== null &&
  //   orgSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};
