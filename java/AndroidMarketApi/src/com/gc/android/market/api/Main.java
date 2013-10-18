/**
 * NOTICE:
 * This file was changed and simplified to be queried from the command line.
 * All copyright related to these changes are retained.    
 */

package com.gc.android.market.api;

import java.util.List;

import com.gc.android.market.api.model.Market.App;
import com.gc.android.market.api.model.Market.AppsRequest;
import com.gc.android.market.api.model.Market.Request.RequestGroup;
import com.gc.android.market.api.model.Market.Response.ResponseGroup;

public class Main {

    private static void usage()
    {
        System.out
                .println("Usage :\n"
                        + "market <email> <password> <android_id> <query> <limit>\n"
                        + "\temail, password : account linked to the specified android id\n"
                        + "\tandroiId : a valid android id (retrieved typing *#*#8255#*#* "
                        + "on device or emulator)\n"
                        + "\tquery : string to be queried"
                        + "\tlimit (optional): maximum number of returned results. Default is 1");
    }

    /**
     * @param args
     */
    public static void main(String[] args)
    {
        try {
            if (args.length < 4) {
                usage();
                return;
            }

            String login = args[0];
            String password = args[1];
            String androidId = args[2];
            String query = args[3];
            int limit = (args.length == 5 ? Integer.parseInt(args[4]) : 1);
            performQuery(login, password, androidId, query, limit);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private static void performQuery(String login, String password,
            String androidId, String query, int limitResults)
    {
        ResponseGroup response = null;
        try {
            MarketSession session = new MarketSession(false);
            session.login(login, password, androidId);

            AppsRequest appsRequest = AppsRequest.newBuilder()
                    .setQuery(query)
                    .setStartIndex(1)
                    .setEntriesCount(limitResults)
                    .setWithExtendedInfo(true)
                    .build();
            
            response = session.execute(RequestGroup.newBuilder().setAppsRequest(appsRequest).build());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
        if(response != null && response.hasAppsResponse() && response.getAppsResponse().getAppCount() > 0){
            List<App> appList = response.getAppsResponse().getAppList();
            for(int i = 0; i<appList.size(); ++i){
                System.out.println("{\n"+ appList.get(i).toString()+"}");
                if(i < appList.size() -1)
                    System.out.println(",");
            }
        } else {
            System.out.println("Could not fetch any app for query "+query);
        }

    }
}
