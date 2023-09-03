import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      data: me.id,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      data: me.id,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  console.log(me);
  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>My profile | Chattybird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header='팔로잉'
          data={me.Followings}
          // onClickMore={loadMoreFollowings}
          // loading={!followingsData && !followingError}
        />
        <FollowList
          header='팔로워'
          data={me.Followers}
          // onClickMore={loadMoreFollowers}
          // loading={!followersData && !followerError}
        />
      </AppLayout>
    </>
  );
};

export default Profile;
