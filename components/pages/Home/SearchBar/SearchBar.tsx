import React, { useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import useResponsive from "../../../../lib/hooks/useResponsive";
import searchSimilarChannel from "../../../../lib/channelHandler/searchSimilarChannel";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const { isDesktop } = useResponsive();

  const [similarChannels, setSimilarChannels] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (e.target.channelName.value.length > 0) {
      const channels = await searchSimilarChannel(e.target.value);

      if (channels && channels.length > 0) {
        setSimilarChannels(channels);
      }
    } else {
      setSimilarChannels([]);
    }
  };

  const handleInputOnchange = (e: any) => {
    setTimeout(async () => {
      if (e.target.value.length > 0) {
        const channels = await searchSimilarChannel(e.target.value);

        if (channels && channels.length > 0) {
          setSimilarChannels(channels);
        }
      } else {
        setSimilarChannels([]);
      }
    }, 1000);
  };

  return (
    <div className={styles.searchbar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="channelName"
          placeholder="Cari Channel..."
          onChange={handleInputOnchange}
        />
        <button type="submit">
          {" "}
          <FaSearch /> {isDesktop && "Search"}
        </button>
      </form>
      <div className={styles.results}>
        {similarChannels.length > 0 &&
          similarChannels.map((channel: any) => (
            <Link href={`/channel/${channel.slug}`} key={channel.channel_name}>
              <div className={styles.channel__link}>
                <div className={styles.channel__img}>
                  <img
                    src={channel.profile_img_url}
                    alt={channel.channel_name}
                  />
                </div>
                {channel.channel_name}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default SearchBar;
