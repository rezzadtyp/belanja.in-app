import prisma from '@/prisma';

interface UserToken {
  id: number;
}

export const getDiscountsByStoreAdminService = async (userToken: UserToken) => {
  try {
    const userId = Number(userToken.id);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        storeAdmin: {
          include: {
            stores: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("Can't find your account");
    }

    if (user.role === 'USER') {
      throw new Error('You do not have access');
    }

    const storeAdmin = await prisma.storeAdmin.findUnique({
      where: { userId: user.id },
    });

    if (!storeAdmin) {
      throw new Error('Store admin not found');
    }

    const store = await prisma.store.findFirst({
      where: { storeAdminId: storeAdmin.id },
    });

    if (!store) {
      throw new Error('store is not found');
    }

    const discounts = await prisma.discount.findMany({
      where: {
        storeId: store.id,
      },
      include: {
        store: true,
        product: true,
      },
    });

    return discounts;
  } catch (error) {
    throw error;
  }
};