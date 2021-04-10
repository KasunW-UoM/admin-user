import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useHistory } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import {
    IconAdmins,
    IconFeedbacks,
    IconContacts,
    IconMaintains,
    IconLogout,
    IconOverview,
    IconSettings,
    IconSubscription,
    IconOrders
} from 'assets/icons';
import { convertSlugToUrl } from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';

const useStyles = createUseStyles({
    separator: {
        borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

function SidebarComponent() {
    const { push } = useHistory();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const isMobile = window.innerWidth <= 1080;

    async function logout() {
        push(SLUGS.login);
    }

    function onClick(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={SLUGS.dashboard}
                title='Dashboard'
                icon={IconSubscription}
                onClick={() => onClick(SLUGS.dashboard)}
            />
            <MenuItem
                id={SLUGS.overview}
                items={[SLUGS.overviewTwo, SLUGS.overviewThree]}
                title='Overview'
                icon={IconOverview}
            >
                <MenuItem
                    id={SLUGS.overview}
                    title='Service Catogory'
                    level={2}
                    icon={IconAdmins}
                    onClick={() => onClick(SLUGS.overview)}
                />
                <MenuItem
                    id={SLUGS.overviewTwo}
                    title='Service Sub Catogory'
                    level={2}
                    icon={IconContacts}
                    onClick={() => onClick(SLUGS.overviewTwo)}
                />
                <MenuItem
                    id={SLUGS.overviewThree}
                    title='Sub Item 3'
                    level={2}
                    icon={IconFeedbacks}
                    onClick={() => onClick(SLUGS.overviewThree)}
                />
            </MenuItem>
            <MenuItem
                id={SLUGS.orders}
                title='Orders'
                icon={IconOrders}
                onClick={() => onClick(SLUGS.orders)}
            />
            <MenuItem
                id={SLUGS.maintains}
                items={[SLUGS.maintainsTwo, SLUGS.maintainsThree]}
                title='Maintains'
                icon={IconMaintains}
            >
                <MenuItem
                    id={SLUGS.maintains}
                    title='Service Catogory'
                    level={2}
                    icon={IconAdmins}
                    onClick={() => onClick(SLUGS.maintains)}
                />
                <MenuItem
                    id={SLUGS.maintainsTwo}
                    title='Service Sub Catogory'
                    level={2}
                    icon={IconContacts}
                    onClick={() => onClick(SLUGS.maintainsTwo)}
                />
                <MenuItem
                    id={SLUGS.maintainsThree}
                    title='Sub Item 3'
                    level={2}
                    icon={IconFeedbacks}
                    onClick={() => onClick(SLUGS.maintainsThree)}
                />
            </MenuItem>
            <MenuItem
                id={SLUGS.contacts}
                title='Contacts'
                icon={IconContacts}
                onClick={() => onClick(SLUGS.contacts)}
            />
            <MenuItem
                id={SLUGS.admins}
                title='Admins'
                icon={IconAdmins}
                onClick={() => onClick(SLUGS.admins)}
            />
            <MenuItem
                id={SLUGS.feedbacks}
                title='Feedbacks'
                icon={IconFeedbacks}
                onClick={() => onClick(SLUGS.feedbacks)}
            />
            <MenuItem
                id={SLUGS.subscription}
                title='Subscription'
                icon={IconSubscription}
                onClick={() => onClick(SLUGS.subscription)}
            />
            <div className={classes.separator}></div>
            <MenuItem
                id={SLUGS.settings}
                title='Settings'
                icon={IconSettings}
                onClick={() => onClick(SLUGS.settings)}
            />

            <MenuItem id='logout' title='Logout' icon={IconLogout} onClick={logout} />
        </Menu>
    );
}

export default SidebarComponent;
