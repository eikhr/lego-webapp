// @flow

import { Component } from 'react';
import type { Event } from 'app/models';
import type { Element } from 'react';
import { Image } from 'app/components/Image';
import { Link } from 'react-router-dom';
import { Flex } from 'app/components/Layout';
import { colorForEvent } from 'app/routes/events/utils';
import styles from './EventItem.css';
import { eventStatus } from 'app/utils/eventStatus';

type Props = {
  item: Event,
  url: string,
  meta: Element<'span'> | null,
  loggedIn: boolean,
  isFrontPage: boolean,
};

class EventItem extends Component<Props, *> {
  render() {
    const { item, url, meta, loggedIn, isFrontPage } = this.props;
    const info = eventStatus(item, loggedIn);

    return (
      <div className={styles.body}>
        <Link to={url} className={styles.link}>
          <Flex className={styles.wrapper}>
            {isFrontPage ? (
              <Flex column className={styles.leftFrontpage}>
                {item.cover && (
                  <Image
                    className={styles.imageFrontpage}
                    width={270}
                    height={80}
                    src={item.cover}
                    placeholder={item.coverPlaceholder}
                  />
                )}
                <span className={styles.info}>{info}</span>
              </Flex>
            ) : (
              <Flex column className={styles.left}>
                {item.cover && (
                  <Image
                    className={styles.image}
                    src={item.cover}
                    placeholder={item.coverPlaceholder}
                    width={390}
                    height={80}
                  />
                )}
                <span className={styles.info}>{info}</span>
              </Flex>
            )}

            <div
              className={styles.right}
              style={{
                borderBottom: `5px solid ${colorForEvent(item.eventType)}`,
              }}
            >
              <h2 className={styles.itemTitle}>{item.title}</h2>
              {meta}
            </div>
          </Flex>
        </Link>
      </div>
    );
  }
}

export default EventItem;
